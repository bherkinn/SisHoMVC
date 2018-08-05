<?php
	require_once("conexion.php");

	Class Principal extends Conexion
	{
	    
	    public function InsertarDatos($datos)
	    {
	        try {
	            
	            $this->Conectar(1);
	            $this->con1->query("INSERT INTO basehorarios (dia,hora,codCurso,secCurso,teopra,codAula,codDocente,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,perAcademico,orden,codAula2) VALUES ('$datos[0]','$datos[1]','$datos[2]','$datos[3]','$datos[4]','$datos[5]','$datos[6]','$datos[7]','$datos[8]','$datos[9]','$datos[10]','$datos[11]','$datos[12]','$datos[13]','$datos[14]','$datos[15]','$datos[16]','$datos[17]','$datos[18]','$datos[19]')");
	            // $this->Close(1);
	            
	        }
	        catch (Exception $e) {
	            
	            echo "error" . $e->getMessage();
	            
	        }
	        
	        
	    }
	    
	    public function ActualizarDatos($datos)
	    {
	        try {
	            
	            $this->Conectar(1);
	            $this->con1->query("UPDATE basehorarios SET  dia='$datos[0]',hora='$datos[1]',codCurso='$datos[2]',secCurso='$datos[3]',teopra='$datos[4]',codAula='$datos[5]',codDocente='$datos[6]',c1='$datos[7]',c2='$datos[8]',c3='$datos[9]',c4='$datos[10]',c5='$datos[11]',c6='$datos[12]',c7='$datos[13]',c8='$datos[14]',c9='$datos[15]',c10='$datos[16]',orden=$datos[18],codAula2='$datos[19]' WHERE idHorarios='$datos[17]'");
	            
	        }
	        catch (Exception $e) {
	            
	            echo "error" . $e->getMessage();
	            
	        }
	        
	    }
	    
	    public function Borrar($id, $estado)
	    {
	        $this->Conectar(1);
	        $this->con1->query("UPDATE basehorarios SET estado=$estado WHERE idHorarios=$id");
	    }
	    
	    public function modificarCursoTablaHorarios($id, $codCurso)
	    {
	        $this->Conectar(1);
	        $this->con1->query("UPDATE basehorarios SET codCurso='$codCurso' WHERE idHorarios=$id");
	        
	    }
	    
	    public function modificarCursoTotalTablaHorarios($periodo, $codCurso, $codCursoNuevo)
	    {
	        $this->Conectar(1);
	        $this->con1->query("UPDATE basehorarios SET codCurso='$codCursoNuevo' WHERE perAcademico='$periodo' and codCurso='$codCurso'");
	        
	    }
	    
	    public function NuevoPeriodo($anteperiodo, $neoperiodo)
	    {
	        $this->Open(1);
	        $this->con1->query("CREATE TEMPORARY TABLE temporal AS SELECT * FROM basehorarios WHERE perAcademico='$anteperiodo';
	                                UPDATE temporal SET perAcademico='$neoperiodo';
	                                ALTER TABLE temporal DROP COLUMN idHorarios;
	                                INSERT into basehorarios (perAcademico,dia,hora,codCurso,secCurso,teopra,codAula,codAula2,codDocente,orden,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,estado,fecha) SELECT * from temporal;");
	    }
	    
	    public function agregarPeriodoPorCurricula($periodo, $curricula)
	    {
	        
	        $sql = "INSERT INTO curricula VALUES ('$periodo','$curricula')";
	        $this->Open(1);
	        $this->con1->query($sql);
	    }
	    
	    public function BorrarPorCurso($codCurso, $periodo)
	    {
	        
	        $sql = "UPDATE basehorarios SET estado=0 WHERE codCurso='$codCurso' AND perAcademico='$periodo'";
	        $this->Conectar(1);
	        $this->con1->query($sql);
	        
	    }

	    // ------------------------------------------Combos------------------------------------------------------

	    public function cboCursos()
	    {
	        
	        $this->Open(2);
	        $this->memoria = $this->con2->query("(SELECT DISTINCT horariosfim.basehorarios.codCurso,oeraae2018.cursos.nomCurso FROM horariosfim.basehorarios LEFT JOIN oeraae2018.cursos ON horariosfim.basehorarios.codCurso=oeraae2018.cursos.codCurso WHERE estado='1' and perAcademico='2018-2') UNION (SELECT DISTINCT oeraae2018.curricular.codCurso,oeraae2018.cursos.nomCurso FROM oeraae2018.curricular LEFT JOIN oeraae2018.cursos ON oeraae2018.curricular.codCurso=oeraae2018.cursos.codCurso WHERE verCurricular='2018-2') ORDER BY codCurso");
	        $datos= $this->memoria->fetchAll(PDO::FETCH_OBJ);
	        $this->Close(2);
	        return $datos;
	    }

	    public function cboDocentes()
	    {
	        
	        $this->Open(2);
	        $this->memoria = $this->con2->query("SELECT codDocente,apePaterno,apeMaterno,nombres from docentes");
	        $datos= $this->memoria->fetchAll(PDO::FETCH_OBJ);
	        $this->Close(2);
	        return $datos;
	    }

	    public function cboAulas()
	    {
	        
	        $this->Open(2);
	        $this->memoria = $this->con2->query("SELECT * FROM aulas WHERE estado='1'");
	        $datos= $this->memoria->fetchAll(PDO::FETCH_OBJ);
	        $this->Close(2);
	        return $datos;
	    }

	    public function mostrarPeriodos(){

	        $sql = "SELECT * FROM curricula ORDER BY perAcademico DESC";
	        $this->Conectar(1);
	        $this->memoria = $this->con1->query($sql);
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);

	            return $datos;

	        } else {
	            
	            return "vacio";
	            
	        }
	    }

	    public function mostrarCursosPorPeriodo($vercurricular){

	        $sql="SELECT DISTINCT codCurso FROM curricular WHERE verCurricular='$vercurricular'";
	         $this->Conectar(2);
	        $this->memoria = $this->con2->query($sql);
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(2);

	            return $datos;

	        } else {
	            
	            return "vacio";
	            
	        }
	    }

    	public function MostrarCorrespondencias($codCurso,$vercurricular){
	        $this->Open(2);
	        $this->memoria = $this->con2->query("SELECT codCurso,m3Ciclo,m4Ciclo,m5Ciclo,m6Ciclo FROM `curricular` WHERE codCurso='$codCurso'AND verCurricular='$vercurricular'");
	        if (!empty($this->memoria)) {
	            $datos= $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(2);
	            return $datos;
	        }
	        else
	        {
	            return "vacio";
	        }
	        
	        
	     }

	    public function MostrarHorariosTabla($curso, $ciclo, $estado){

	        $sql = "SELECT * FROM basehorarios WHERE codCurso='$curso' and perAcademico='$ciclo' and estado=$estado ORDER BY orden,idHorarios;";

	        $this->Open(1);
	        $this->memoria = $this->con1->query($sql);
	        
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            
	            return $datos;
	        } else {
	            
	            return "vacio";
	            
	        }
	    }

	    public function mostrarVerCurricular()
	    {
	        $sql = "SELECT DISTINCT verCurricular FROM curricular";
	        $this->Conectar(2);
	        $this->memoria = $this->con2->query($sql);
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(2);

	            return $datos;

	        } else {
	            
	            return "vacio";
	            
	        }
	    }

	    // Aulas Disponibles

	    public function horarioPorDia($dia,$periodo){
	    	$sql="SELECT codCurso,codAula,dia,hora from basehorarios WHERE dia='$dia' and perAcademico='$periodo'";
	    	$this->Open(1);
	        $this->memoria = $this->con1->query($sql);
	        
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            
	            return $datos;
	        } else {
	            
	            return "vacio";
	            
	        }
	    }

	    public function cambiarAula($id,$aula)
	    {
	    	try {
	    		$this->Open(1);
	        	$this->con1->query("UPDATE basehorarios SET codAula='$aula' WHERE idHorarios=$id");
	        	return "ok";
	    	} catch (Exception $e) {
	    		return "error";
	    	}
	    	
	    }

	}
?>
<?php 
	require_once("conexion.php");

	Class Docentes_Manual extends Conexion{

		public function cboDocentes()
	    {
	        $this->Open(2);
	        $this->memoria = $this->con2->query("SELECT codDocente,apePaterno,apeMaterno,nombres from docentes");
	        $datos= $this->memoria->fetchAll(PDO::FETCH_OBJ);
	        $this->Close(2);
	        return $datos;
	    }

	    public function cboPeriodos(){

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

	    public function HorarioDocente($codDocente,$periodo)
	    {
	        try {
	            $this->Conectar(1);
	            $this->memoria = $this->con1->query("SELECT horariosfim.basehorarios.*,oeraae2018.docentes.apePaterno,oeraae2018.docentes.celular,oeraae2018.docentes.telefono,oeraae2018.docentes.apeMaterno,oeraae2018.docentes.nombres from horariosfim.basehorarios INNER JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente WHERE horariosfim.basehorarios.codDocente=$codDocente AND horariosfim.basehorarios.perAcademico='$periodo' AND horariosfim.basehorarios.estado=1");
	            $datos= $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            return $datos;
	        }
	        catch (Exception $a) {
	            echo "error" . $a->getMessage();
	        }
	    }
	}
?>
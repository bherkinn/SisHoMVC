<?php 
	require_once("conexion.php");

	Class CargaDocente extends Conexion
	{	
		public function ObtenerDocentesHorarios(){
			$sql="SELECT DISTINCT CONCAT(oeraae2018.docentes.apePaterno,' ', oeraae2018.docentes.apeMaterno,', ',oeraae2018.docentes.nombres) AS nombres,horariosfim.basehorarios.codDocente,oeraae2018.docentes.depAcademico from horariosfim.basehorarios LEFT JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente WHERE horariosfim.basehorarios.perAcademico='2018-2' AND horariosfim.basehorarios.estado='1'";

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

		public function ObtenerHorariosDistintos(){
			$sql="SELECT DISTINCT horariosfim.basehorarios.codDocente,horariosfim.basehorarios.codCurso,horariosfim.basehorarios.secCurso,oeraae2018.cursos.nomCurso FROM horariosfim.basehorarios LEFT JOIN oeraae2018.cursos ON horariosfim.basehorarios.codCurso=oeraae2018.cursos.codCurso WHERE horariosfim.basehorarios.perAcademico='2018-2' AND horariosfim.basehorarios.estado='1' ORDER BY horariosfim.basehorarios.codDocente,horariosfim.basehorarios.codCurso";

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

		public function ObtenerHorariosTotal(){
			$sql="SELECT horariosfim.basehorarios.codDocente,horariosfim.basehorarios.codCurso,horariosfim.basehorarios.secCurso,horariosfim.basehorarios.hora,horariosfim.basehorarios.teopra FROM horariosfim.basehorarios LEFT JOIN oeraae2018.cursos ON horariosfim.basehorarios.codCurso=oeraae2018.cursos.codCurso WHERE horariosfim.basehorarios.perAcademico='2018-2' AND horariosfim.basehorarios.estado='1' ORDER BY horariosfim.basehorarios.codDocente,horariosfim.basehorarios.codCurso";

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
	}

	
 ?>